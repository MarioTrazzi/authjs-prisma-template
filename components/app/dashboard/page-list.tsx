import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/db"
import Link from "next/link"


export async function PageList() {
  const page = await prisma.page.findMany()
  return (
    <Table>
      <TableCaption>Suas Paginas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {page.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-medium">{page.id}</TableCell>
            <TableCell>{page.name}</TableCell>
            <TableCell>{page.description}</TableCell>
            <TableCell>{JSON.stringify(page.published)}</TableCell>
            <TableCell><Button><Link 
            href={`/app/page-designer/${page.id}`}
            >Acessar</Link>
            </Button></TableCell>
            <TableCell>R$ 20.000,00</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
