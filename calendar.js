/* 
    Author     : James La Broy
*/

Object.prototype.calendar = function() {
	var date_input = this;
	
	var days = ['sun','mon','tue','wed','thu','fri','sat'];
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	var date = date_input.value == '' ? new Date() : new Date(date_input.value);
	var current_month = date.getMonth();
	var current_year = date.getFullYear();

	var day;
	var month;
	var year;
	
	if (date_input.value != '') {
		var selected_day = date.getDate(), 
			selected_month = date.getMonth() + 1, 
			selected_year = date.getFullYear();
	} else {
		var selected_day, selected_month, selected_year;
	}

	var calendar;

	init();
	function init() { 
		// wrap the input element with a div
		var container = document.createElement("div");
		container.classList.add("calendar");
		date_input.parentNode.insertBefore(container, date_input);

		date_input.parentNode.removeChild(date_input);
		container.appendChild(date_input);

		// hide html5 element
		date_input.style.display = 'none';

		// add calendar elements
		var header = document.createElement("div");
		header.classList.add("calendar-header");
		container.appendChild(header);

		month = document.createElement("div");
		month.classList.add("month");
		month.innerHTML = months[current_month];
		header.appendChild(month);

		year = document.createElement("div");
		year.classList.add("year");
		year.innerHTML = current_year;
		header.appendChild(year);

		var next = document.createElement("div");
		next.classList.add("next");
		next.classList.add("fa-right");

		next.onclick = function() {
			current_month++;
			if (current_month == 12) {
				current_year++;
				current_month = 0;
			}

			changeDate(current_month, current_year);
		};

		header.appendChild(next);

		var previous = document.createElement("div");
		previous.classList.add("previous");
		previous.classList.add("fa-left");

		previous.onclick = function() {
			current_month--;
			if (current_month == -1) {
				current_year--;
				current_month = 11;
			}

			changeDate(current_month, current_year);
		};

		header.appendChild(previous);

		calendar = document.createElement("table");
		var days_row = document.createElement("tr");
		calendar.appendChild(days_row);

		for (var i in days) {
			if (!isNaN(i)) {
				var day = document.createElement("th");
				day.innerHTML = days[i]; 

				days_row.appendChild(day);
			}
		}

		for (var i = 0; i < 6; i++) {
			var row = document.createElement("tr");
			row.classList.add("day-row");
			calendar.appendChild(row);

			for (var ii in days) {
				if (!isNaN(ii)) {
					var day = document.createElement("td");
					day.classList.add("day");
					row.appendChild(day);
				}
			}
		}

		container.appendChild(calendar);
		
		changeDate(current_month, current_year);
	}

	function changeDate(m, y) {
		var	start = new Date(y, m, 1).getDay();
		var end = new Date(y, m+1, 0).getDate();

		month.innerHTML = months[m];
		year.innerHTML = y;

		// wipe out current calendar
		var _days = calendar.querySelectorAll(".day");
		for (var i in _days) {
			if (!isNaN(i)) {
				_days[i].innerHTML = '';
				_days[i].classList.remove("filled");
			}
		}

		if (calendar.querySelector(".selected") != null) {
			calendar.querySelector(".selected").classList.remove("selected");
		}

		var rows = calendar.querySelectorAll(".day-row");
		var cur = 1;
		for (var i in rows) { 
			if (!isNaN(i)) {
				var days = rows[i].querySelectorAll(".day");
				for (var ii in days) { 
					if (!isNaN(ii)) {
						days[ii].onclick = function() {
							if (calendar.querySelector(".selected") != null) {
								day = this.innerHTML;
								calendar.querySelector(".selected").classList.remove("selected");
							}

							this.classList.add("selected");
							setDate(this.innerHTML, m+1, y);
						}

						if (cur > end) {
							continue;
						}

						if (i == 0) {
							if (ii == start) {
								if (cur == selected_day && m == selected_month - 1 && y == selected_year) {
									days[ii].classList.add("selected");
								}	

								days[ii].classList.add("filled");
								days[ii].innerHTML = cur;
								cur++;
								continue;
							}
						}

						if (cur > 1) {
							if (cur == selected_day && m == selected_month - 1 && y == selected_year) {
								days[ii].classList.add("selected");
							}						

							days[ii].classList.add("filled");
							days[ii].innerHTML = cur;
							cur++;
						}
					}
				}
			}
		}
	}

	function setDate(d, m, y) { 
		selected_day	= d;
		selected_month	= m;
		selected_year	= y;

		m = m < 10 ? '0'+m : m;
		d = d < 10 ? '0'+d : d;

		date_input.value = y + '-' + m + '-' + d;
	}
}
