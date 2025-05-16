import { UserService } from "./UserServices";
import { BlogService } from "./BlogServices";
import { FileService } from "./FileServices";
import { ExerciseService } from "./ExerciseServices";
import { ExamService } from "./ExamServices";
export class IUserService extends UserService { }
export class IBlogService extends BlogService { }
export class IFileService extends FileService { }
export class IExerciseService extends ExerciseService { }
export class IExamService extends ExamService { }