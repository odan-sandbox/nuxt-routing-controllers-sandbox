import { Controller, Param, Get } from "routing-controllers";

@Controller()
export class UserController {
  @Get("/users")
  getAll() {
    return "This action returns all users";
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }
}
