"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authToken } from "@/service/auth";
 
const PageAuth = () => {
    const router = useRouter();
    const [Data, setData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            router.push("/dashboard");
        }
    }, [router]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setData({
            ...Data,
            [name]: value
        });
    };

    const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await authToken(Data);
            router.push("/dashboard");
        } catch (error) {
            console.log(error)
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmitForm} className="w-[80%] mx-auto flex flex-col gap-8 items-center p-8 shadow-md">
                <input onChange={onChange} type="text" placeholder="username" name="username" />
                <input onChange={onChange} type="email" placeholder="correo@ejemplo.com" name="email" />
                <input onChange={onChange} type="password" placeholder="******" name="password" />
                <input type="submit" value="Enviar" className="cursor-pointer bg-indigo-600 p-2 rounded text-white w-full" />
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PageAuth;
