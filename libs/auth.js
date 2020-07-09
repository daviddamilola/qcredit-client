export default function useAuth() {
    if (typeof (Storage) !== "undefined") {
        const token = `${localStorage.getItem('auth')}`;
        const privi = `${localStorage.getItem('privi')}`;
        return {
            token,
            privi,
        }
    } else {
        return {
            error: 'LocalStorage not supported'
        }
    }
} 