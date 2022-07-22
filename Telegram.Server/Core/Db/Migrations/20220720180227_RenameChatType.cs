using Microsoft.EntityFrameworkCore.Migrations;

namespace Telegram.Server.Core.Db.Migrations
{
    public partial class RenameChatType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Chats",
                type: "text",
                nullable: false,
                defaultValue: "Group",
                oldClrType: typeof(string),
                oldType: "text",
                oldDefaultValue: "Public");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Chats",
                type: "text",
                nullable: false,
                defaultValue: "Public",
                oldClrType: typeof(string),
                oldType: "text",
                oldDefaultValue: "Group");
        }
    }
}
