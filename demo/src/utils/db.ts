import { prisma } from '@/utils/lib/database.js'
import { success, failure } from '@anjianshi/utils/index.js'

export async function demoDB() {
  const result = await prisma.$withTransaction(async () => {
    const students = await prisma.student.findMany({})
    return students.length ? success(students) : failure('没有学生')
  })
  console.log(result)
}
