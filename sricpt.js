Board = (
    function()
    {
      var color = "blue";
    
      function GetChip() {
        switch (color) {
          case "blue":
            color = "red";
            $("p").eq(0).text("Player Two: It is your turn, please pick a column to drop your red chip.");
            break;
          case "red":
            color = "blue";
            $("p").eq(0).text("Player One: It is your turn, please pick a column to drop your blue chip.");
            break;
          default:
    
        }
      }
    
      function Click( chip ) {
        var selector = "[colnum=" + chip.attr("colnum") + "]";
        var rownum = 0;
        for ( var i = 5; i >= 0; i-- )
        {
            if ( $(selector).eq(i).attr("color") != "none" ) continue;
            $(selector).eq(i).attr("color",color);
            break;
        }
        GetChip();
        var winner = Check();
        if( winner ){
          $(".chip").off( "click" );
          $(".chip").off( "mouseover" );
          $(".chip").off( "mouseout" );
          $("#gameboard").fadeOut( 2000, function(){ Celebrate( winner ) } );
        }
      }
    
      function Celebrate( winner ) {
        var $celebration = $("<div />", { class: "jumbotron" })
        switch (winner) {
          case "blue":
            $celebration.html("<h1>Congratulations</h1><h4>Player One Wins</h4><button class='btn btn-primary' onclick='Board.Restart();'>Restart</button>");
            break;
          case "red":
            $celebration.html("<h1>Congratulations</h1><h4>Player Two Wins</h4><button class='btn btn-primary' onclick='Board.Restart();'>Restart</button>");
            break;
          default:
        }
        $("#gameboard").html("");
        $("#page").append( $celebration );
      }
    
      function Restart() {
        if( $(".jumbotron").eq(0) ) $(".jumbotron").eq(0).remove();
        Build();
      }
    
      function Check(){
        for ( var i in [ 0,1,2,3,4,5 ] )
        {
          var count = 1;
          var selector = "[rownum=" + i + "]";
          var testcolor = $(selector).eq(0).attr("color");
            for ( var n = 1; n < 7; n++ )
            {
              if ($(selector).eq(n).attr("color") === testcolor && testcolor != "none" )
              { count++; }
              else {
                count = 1;
                testcolor = $(selector).eq(n).attr("color");
              }
              if( count > 3 ) {
                return( testcolor );
              }
            }
        }
        for ( var i in [ 0,1,2,3,4,5,6 ] )
        {
          var count = 1;
          var selector = "[colnum=" + i + "]";
          var testcolor = $(selector).eq(0).attr("color");
            for ( var n = 1; n < 6; n++ )
            {
              if ($(selector).eq(n).attr("color") === testcolor && testcolor != "none" )
              { count++; }
              else {
                count = 1;
                testcolor = $(selector).eq(n).attr("color");
              }
              if( count > 3 ) {
                return( testcolor );
              }
            }
        }
        return( false );
      }
    
      function Highlight( chip ) {
        $("[colnum=" + chip.attr("colnum") + "]").toggleClass("hlight");
      }
    
      function Build() {
        $("#gameboard").fadeIn(10);
        for ( var i in [ 0,1,2,3,4,5 ]  )
        {
          var $col = $("<div />", { class : "row" });
          for ( var n in [ 0,1,2,3,4,5,6 ] ) {
            var $cel = $("<div />", { colnum : n, rownum : i, class : "chip", color: "none" });
            $cel.click( function(){ Board.Click( $(this)) } );
            $cel.mouseover( function(){ Board.Highlight( $(this)) } );
            $cel.mouseout( function(){ Board.Highlight( $(this)) } );
            $col.append( $cel )
          }
          $("#gameboard").append( $col );
        }
    
      }
      return({  "Build" : Build,
                "Click" : Click,
                "Restart" : Restart,
                "Highlight" : Highlight  });
    
    })();
    