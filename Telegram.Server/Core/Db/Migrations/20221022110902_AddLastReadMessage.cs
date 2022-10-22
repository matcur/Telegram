using Microsoft.EntityFrameworkCore.Migrations;

namespace Telegram.Server.Core.Db.Migrations
{
    public partial class AddLastReadMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LastReadMessages",
                columns: table => new
                {
                    ChatId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    MessageId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LastReadMessages", x => new { x.UserId, x.MessageId, x.ChatId });
                    table.ForeignKey(
                        name: "FK_LastReadMessages_Chats_ChatId",
                        column: x => x.ChatId,
                        principalTable: "Chats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LastReadMessages_Messages_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Messages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LastReadMessages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LastReadMessages_ChatId",
                table: "LastReadMessages",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_LastReadMessages_MessageId",
                table: "LastReadMessages",
                column: "MessageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LastReadMessages");
        }
    }
}
