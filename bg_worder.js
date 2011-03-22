onmessage = function (event) {
	if (event.data == "load_map_finish") {
		postMessage("Load map finished");
	} else if(event.data == "add_more_sprite") {
		postMessage("Add more sprite please.");
	}
};