import { IBlogRepository } from "../repository/IRepository"

const iBlogRepository = new IBlogRepository()
export class BlogService {

    async findAllBlog(query: any) {
        try {
            const result = await iBlogRepository.findBlog(query)
            return result
        } catch (error) {
            throw error
        }

    }

    async createBlog(body: any) {
        try {
            const result = await iBlogRepository.createBlog(body)
            return result
        } catch (error) {
            throw error
        }

    }
    async updateBlog(body: any, id: number) {
        try {
            const result = await iBlogRepository.updateBlog(body, id)
            return result
        } catch (error) {
            throw error
        }

    }
    async deleteBlog(id: number) {
        try {
            const result = await iBlogRepository.deleteBlog(id)
            return result
        } catch (error) {
            throw error
        }

    }
}