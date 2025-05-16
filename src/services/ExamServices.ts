import { IExamRepository } from "../repository/IRepository"
const iExamRepository = new IExamRepository()
export class ExamService {

    async findAllExam(query: any) {
        try {
            const result = await iExamRepository.findExam(query)
            return result
        } catch (error) {
            throw error
        }

    }

    async createExam(body: any) {
        try {
            const result = await iExamRepository.createExam(body)
            return result
        } catch (error) {
            throw error
        }

    }
    async updateExam(body: any, id: number) {
        try {
            const result = await iExamRepository.updateExam(body, id)
            return result
        } catch (error) {
            throw error
        }

    }
    async deleteExam(id: number) {
        try {
            const result = await iExamRepository.deleteExam(id)
            return result
        } catch (error) {
            throw error
        }

    }
}