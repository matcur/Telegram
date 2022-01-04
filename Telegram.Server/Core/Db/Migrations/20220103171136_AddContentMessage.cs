using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Telegram.Server.Core.Db.Migrations
{
    public partial class AddContentMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentMessage_Messages_MessagesId",
                table: "ContentMessage");

            migrationBuilder.RenameColumn(
                name: "MessagesId",
                table: "ContentMessage",
                newName: "MessageId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentMessage_MessagesId",
                table: "ContentMessage",
                newName: "IX_ContentMessage_MessageId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Messages",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "NOW()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValueSql: "getdate()");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentMessage_Messages_MessageId",
                table: "ContentMessage",
                column: "MessageId",
                principalTable: "Messages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentMessage_Messages_MessageId",
                table: "ContentMessage");

            migrationBuilder.RenameColumn(
                name: "MessageId",
                table: "ContentMessage",
                newName: "MessagesId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentMessage_MessageId",
                table: "ContentMessage",
                newName: "IX_ContentMessage_MessagesId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Messages",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValueSql: "NOW()");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentMessage_Messages_MessagesId",
                table: "ContentMessage",
                column: "MessagesId",
                principalTable: "Messages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
