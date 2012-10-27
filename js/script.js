	var currentPagePath = "/pages/home.html";
	var collapse = "";
	function loadNav(callback){
		$.get("components/nav.html?"+ new Date(), function(response){
			$("#navcontainer").css({opacity:0}).append(response).animate({opacity:1}, 300, function(){
				collapse = $("#navcontainer").find(".collapse");
			});
		});
	}
	
	function hideCollapse(){
		if($(collapse).hasClass('in')){
			$(collapse).collapse("toggle");
		}
	}
	
	function loadPage(filename){
		$.get(filename + "?" + new Date(), function(response){
			$("#content").animate({opacity:0}, 200, function(){
				$(this).empty().append(response).animate({opacity:1}, 200, function(){
					hideCollapse();
					
				});
			});
		})
	}
	
	jQuery(document).ready(function(){
		loadNav(null);
		currentPagePath = window.location.hash.replace("#", '');
		if(currentPagePath == null || currentPagePath == ''){
			currentPagePath = "/pages/home.html";
		}
		
		$("a[data-load]").live('click', function(){
			$("a[data-load]").parent('li').removeClass('active');
			$(this).parent('li').addClass('active');
			document.title = "Emman Bautista - " + $(this).data("link-title");
		});
		
		window.location.href = '/#'+ currentPagePath;
	});
	
	$(window).bind('hashchange', function(e){
		currentPagePath = e.target.location.hash.replace("#", '');	
		loadPage(currentPagePath);
	});

	$(window).bind('load', function(){
		$(window).trigger('hashchange');
	});