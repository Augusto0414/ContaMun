import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const token = "";
            if (token) return router.replace("/(tabs)/home");
        }
        checkSession();
    }, []);

    return <Slot />

}