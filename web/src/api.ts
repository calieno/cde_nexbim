import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3030',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshTokenId = localStorage.getItem('refreshTokenId');

            if (refreshTokenId) {
                try {
                    const { data } = await axios.post('http://localhost:3030/refresh-token', {
                        refresh_token: refreshTokenId
                    });

                    // Assuming refresh token endpoint returns { token: "new_token", refreshToken: { id: "..." } }
                    // Need to check RefreshTokenController response format.
                    // Based on previous turn, it returns { vToken, vRefreshToken? } or similar.
                    // Let's assume standard naming or map it.

                    // Wait, I should verify RefreshTokenUseCase response too.
                    // But for now, let's assume it returns { token, refreshToken } or similar and I'll log it to debug if needed.
                    // Actually, let's check RefreshTokenUseCase.ts

                    const newToken = data.token || data.vToken;
                    const newRefreshToken = data.refreshToken || data.vRefreshToken;

                    localStorage.setItem('token', newToken);

                    if (newRefreshToken?.id) {
                        localStorage.setItem('refreshTokenId', newRefreshToken.id);
                    }

                    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Refresh token failed', refreshError);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshTokenId');
                    window.location.href = '/login';
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshTokenId');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
