using Microsoft.EntityFrameworkCore.Migrations;

namespace Telegram.Server.Core.Db.Migrations
{
    public partial class AddChatCreator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Chats",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_CreatorId",
                table: "Chats",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Users_CreatorId",
                table: "Chats",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Users_CreatorId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_CreatorId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Chats");
        }
    }
}
