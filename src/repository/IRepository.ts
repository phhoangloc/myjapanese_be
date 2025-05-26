import { $Enums } from "@prisma/client";
import { UserRepository } from "./UserRepository";
import { BlogRepository } from "./BlogRepository";
import { FileRepository } from "./FileRepository";
import { ExerciseRepository } from "./ExerciseRepository";
import { ExamRepository } from "./ExamRepository";
import { DoHomeWorkRepository } from "./DoHomeWorkRepository";
export class IUserRepository extends UserRepository { }
export class IBlogRepository extends BlogRepository { }
export class IFileRepository extends FileRepository { }
export class IExerciseRepository extends ExerciseRepository { }
export class IExamRepository extends ExamRepository { }
export class IDoHomeWorkRepository extends DoHomeWorkRepository { }