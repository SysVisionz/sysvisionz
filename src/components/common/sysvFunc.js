export const ajaxJson = (html, data, returnVariables) => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var returnValue = JSON.parse(this.responseText);
			return returnValue;
		}
	}
	xhttp.open("GET", data, true);
	xhttp.send();
}

export const arrayFind = (arrayToSearch, arrayToFind) => {
	for(var i=0; i < arrayToFind.length; i++) {
		arrayToSearch = arrayToSearch[arrayToFind[i]];
	}
	return arrayToSearch;
}

export const encodeEmail = (email, subject, body) => window.open('mailto:' + email +'?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body));