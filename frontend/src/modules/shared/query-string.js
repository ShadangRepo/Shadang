/* eslint-disable no-useless-escape */
export const getUrlParameter = name => {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	let results = regex.exec(window.location.search);
	return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
