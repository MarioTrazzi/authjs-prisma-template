import { Metadata } from "next"

import { auth } from "@/auth"
import LoginForm from "@/components/auth/login-form"
import NewPageButton from "@/components/app/dashboard/new-page-button"
import { PageListEdit } from "@/components/app/dashboard/page-list-create"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default async function CriationPage() {
  const session = await auth()
  if (!session) return (
  <div className="flex flex-col items-center justify-center p-16">
   <span className="text-bold p-4">Você precisa estar logado para criar suas Paginas</span> 
                    <LoginForm />

   </div>)
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-8">
      <div className="flex flex-col justify-center">
<h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-xl lg:text-3xl dark:text-white">
								<span className="bg-gradient-to-r from-primary dark:to-white to-gray-600 text-transparent bg-clip-text">
									Criar novo E-commerce
								</span>
							</h1>
  
<NewPageButton /> 
</div>
<div className="mt-16">
<h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-xl lg:text-3xl dark:text-white">
								<span className="bg-gradient-to-r from-primary dark:to-white to-gray-600 text-transparent bg-clip-text">
								Ou acesse suas paginas
								</span>
							</h1>
              <PageListEdit />
</div>
</div>
 )
}