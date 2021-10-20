using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Telegram.Server.Core.Db.Migrations
{
    public partial class AddMessageCreationDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Messages",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "NOW()");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Messages");
        }
    }
}
