import { IDoHomeWorkRepository } from "../repository/IRepository"
const iDoHomeWorkRepository = new IDoHomeWorkRepository()
export class DoHomeWorkServices {

    async findAllDoHomeWork(query: any, ids: { examId: number, userId: number }) {
        try {
            const result = await iDoHomeWorkRepository.findResult(query, ids)
            return result
        } catch (error) {
            throw error
        }

    }
    async createDoHomeWork(body: any) {
        try {
            const result = await iDoHomeWorkRepository.createResult(body)
            return result
        } catch (error) {
            throw error
        }

    }
    async UpdateDoHomeWork(body: any, ids: { examId: number, userId: number }) {
        try {
            const result = await iDoHomeWorkRepository.updateResult(body, ids)
            return result
        } catch (error) {
            throw error
        }

    }
}