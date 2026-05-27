import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class UsuarioLogin {

    @ApiProperty({
        example: "usuario@email.com",
        description: "Email do usuário"
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        example: "123456",
        description: "Senha do usuário"
    })
    @IsString()
    @MinLength(6)
    senha!: string;
}