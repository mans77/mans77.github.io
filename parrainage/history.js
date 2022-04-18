/*
 *  Copyright 2012 Anyware Services
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

if (typeof window.ART_HISTORY == 'undefined') window.ART_HISTORY = { };

ART_HISTORY = {
	limit : 6,
	cookieName : 'ametys-zone-history'
};

if (!Array.indexOf) 
{
	Array.prototype.indexOf = function (obj, start) 
	{
		for (var i = (start || 0); i < this.length; i++) 
		{
			if (this[i] == obj) 
			{
				return i;
			}
		}
		return -1;
	}
}


function navigationHistory(template, zonetitle) 
{
	/* get title and url */
	var title = document.title.split('-');
	
	var url = location.href;
	var anchor = (url).indexOf('#');
	var queryString = (url).indexOf('?');
	
	if (anchor != -1)
	{
		url = url.substring(0, anchor);
	}
	
	if (queryString != -1)
	{
		url = url.substring(0, queryString);
	}
	
	var fieldArray = $j.trim(title[0])+';' + url;
	 
	/* get cookie */
	var cookieHistory = new Array();
	
	if ($j.cookie(ART_HISTORY.cookieName)) 
	{
		cookieHistory = $j.cookie(ART_HISTORY.cookieName).split('|');
	}
	else
	{
		$j.cookie(ART_HISTORY.cookieName, cookieHistory.join('|'), {'path' : contextPath});
	}
	
	/* add title and url in cookie */
	var fieldIndex = cookieHistory.indexOf(fieldArray);
	if (fieldIndex == -1) 
	{
		if (cookieHistory.length > ART_HISTORY.limit)
		{
			cookieHistory.pop();
		}
	}
	else 
	{
		cookieHistory.splice(fieldIndex, 1);
	}
	
	/* Display History*/
	if (cookieHistory.length > 0) 
	{
		var historyListWrapper = $j(document.createElement('div'));
		var historyList = $j(document.createElement('ul'));
		historyListWrapper.append(historyList);
		
		$j.each(cookieHistory, function(i, value) {
			if (i < cookieHistory.length)
			{
				var el = value.split(';');
				var anchor = $j(document.createElement('a')).append(el[0]);
				anchor.attr('href', el[1]);
				$j(document.createElement('li')).append(anchor).appendTo(historyList);
			}
		});
		
		var content = historyList.dom;
		
		var value = template.replace(/!!!([^@]|@[^@]|@@[^@])+@@@/g, "").replace("@AMETYSHISTORYTITLEMARKER@", zonetitle).replace("@AMETYSHISTORYCONTENTMARKER@", historyListWrapper.html());
		document.write(value);
	}
	
	/* Add History*/
	
	cookieHistory.unshift(fieldArray);
	$j.cookie(ART_HISTORY.cookieName, cookieHistory.join('|'), {'path' : contextPath});

}

