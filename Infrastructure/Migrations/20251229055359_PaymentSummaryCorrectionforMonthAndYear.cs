using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PaymentSummaryCorrectionforMonthAndYear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentSummary_ExYear",
                table: "Orders",
                newName: "PaymentSummary_ExpYear");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_ExMonth",
                table: "Orders",
                newName: "PaymentSummary_ExpMonth");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentSummary_ExpYear",
                table: "Orders",
                newName: "PaymentSummary_ExYear");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_ExpMonth",
                table: "Orders",
                newName: "PaymentSummary_ExMonth");
        }
    }
}
