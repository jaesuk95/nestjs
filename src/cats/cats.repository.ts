import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {CatsRequestDto} from "./dto/cats.request.dto";

// repository 도 dependency Injection 이 가능한 클래스다
// 이유는 서비스단에서 dependencyInjection 을 사용하고 (ex. provides data from repository -> services)
@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

    async existsByEmail(email: string): Promise<boolean> {
            // mongoose v6 이후로부터 더 구체적으로 작성해야 한다.
            const result = await this.catModel.exists({ email });
            if (result) return true;
            else return false;
        }

    async create(cat: CatsRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }

    // 실험으로 해본거
    async findById(id: string): Promise<Cat> {
        return this.catModel.findById(id);
    }

    // 해당 이메일 찾기
    async findCatByEmail(email: string): Promise<Cat | null> {
        return this.catModel.findOne({email});
    }

    async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
        // select('-password') 비밀번호만 제외만 모든 데이터 가져오기
        return this.catModel.findById(catId).select('-password');
        // 이름 + 이메일만 가져오기
        // return this.catModel.findById(catId).select('email name');
    }
}