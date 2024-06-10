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


export async function PageListEdit() {
  const page = await prisma.page.findMany()
  return (
    <Table>
      <TableCaption>Suas Paginas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {page.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-medium">{page.id}</TableCell>
            <TableCell>{page.name}</TableCell>
            <TableCell><Button><Link 
            href={`/app/page-designer/${page.id}`}
            >Editar</Link>
            </Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
