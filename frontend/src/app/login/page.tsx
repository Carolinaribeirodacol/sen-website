"use client"
import { Button } from "@/components/ui/Button";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Login({session}: any) {
    const signInButtonNode = () => {
        if (session) {
          return false;
        }
    
        return (
            <Link href="/api/auth/signin">
                <Button 
                    onClick={(e) => {
                        e.preventDefault();
                        signIn();
                    }} 
                    typeButton="google" 
                />
            </Link>
        )
    };

    const signOutButtonNode = () => {
        if (!session) {
          return false;
        }
    
        return (
          <div>
            <Link href="/api/auth/signout">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sair
              </button>
            </Link>
          </div>
        );
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-300 p-10">
            <div className="flex flex-col items-center justify-center px-8 py-8 bg-white rounded-lg">
                <div className="space-y-4 md:space-y-4 sm:p-4">
                    <h1 
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Entre ou cadastre-se
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label 
                                className="block mb-2 text-sm font-medium text-gray-800"
                            >
                                Seu email
                            </label>
                            <input 
                                type="email"
                                name="email" 
                                id="email" 
                                className="bg-gray-400/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                placeholder="name@company.com" 
                            />
                        </div>
                        <div>
                            <label 
                                className="block mb-2 text-sm font-medium text-gray-800"
                            >
                                Senha
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••" 
                                className="bg-gray-400/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        id="remember" 
                                        aria-describedby="remember" 
                                        type="checkbox" 
                                        className="w-4 h-4 rounded bg-gray-400/40 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-800">Lembrar</label>
                                </div>
                            </div>
                            <a 
                                href="#" 
                                className="text-sm font-medium text-primary-600 hover:underline text-blue-400"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        <div className="flex justify-center">
                            <Button typeButton="common" textButton="Entrar" />
                        </div>

                        <div className="p-0 m-0">
                            {signOutButtonNode()}
                            {signInButtonNode()}
                            <Button typeButton="facebook" />
                        </div>
                        
                        <p className="text-sm font-light text-gray-800">
                            Ainda não possui cadastro? <a href="#" className="font-medium text-primary-500 hover:underline">Cadastrar</a>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}