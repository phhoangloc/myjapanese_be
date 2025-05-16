
import { IFileRepository } from "../repository/IRepository";
const iFileServices = new IFileRepository()
export class FileService {
    async findAllFile(query: any) {
        try {
            const result = await iFileServices.findFile(query)
            return result
        } catch (error) {
            throw error
        }
    }
    async createFile(body: any) {
        try {
            const result = await iFileServices.createFile(body)
            return result
        } catch (error) {
            throw error
        }
    }
    async deleteFile(id: number) {
        try {
            const result = await iFileServices.deleteFile(id)
            return result
        } catch (error) {
            throw error
        }
    }
}