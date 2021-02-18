import {Module} from "@nestjs/common";
import {ViewService} from "./view.service";
import {ViewController} from "./view.controller";

@Module({
    imports: [],
    providers: [ViewService],
    controllers: [ViewController]
})
export class ViewModule {}