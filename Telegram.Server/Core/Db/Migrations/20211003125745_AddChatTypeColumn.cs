using Microsoft.EntityFrameworkCore.Migrations;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Db.Migrations
{
    public partial class AddChatTypeColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Chats",
                type: "text",
                nullable: false,
                defaultValue: ChatType.Conversation
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Chats"
            );
        }
    }
}
