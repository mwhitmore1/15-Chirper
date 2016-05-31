namespace Chirper.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testChirp : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Chirps", "Text", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Chirps", "Text", c => c.String());
        }
    }
}
