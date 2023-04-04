var axios = require('axios');
const fs = require('fs');
var request = require('request');
var csv = require("csvtojson");
var querystring = require('querystring');

var data = []
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
class leadService {
	constructor() {

	}



	async createLeads(filePath = "./services/leads.csv") {

		await sleep(10000);
		var jsonObj = {};

		try {
			jsonObj = await csv().fromFile(filePath);
			//console.log(jsonObj)
		}
		catch (error) {
			console.log(error)
		}

		for (var i = 0; i < jsonObj.length; i++) {

			try {


				var options = {
					'method': 'POST',
					'url': 'https://www.digibutionnetwork.com/api/v2/leads/create',
					'headers': {
						'Content-Type': 'application/json; charset=utf-8',
				 		'X-Api-Key': 'e86d6a94eea5e6e16e476410ee33a6e1',
					},
					formData: {
						"lead_name": jsonObj[i].FirstName + ' ' + jsonObj[i].LastName,
						"lead_email": jsonObj[i].Email,
						"InvestmentFirm": jsonObj[i].InvestmentFirm,
						"Title": jsonObj[i].Title,
						"lead_phone": jsonObj[i].ContactNumber,
					}
				};
				request(options, function (error, response) {
					if (error) throw new Error(error);
					console.log(response.body);
				});

				// var config = {
				// 	method: 'post',
				// 	url: 'https://www.digibutionnetwork.com/api/v2/leads/create',
				// 	headers: {
				// 		'Content-Type': 'application/json; charset=utf-8',
				// 		'X-Api-Key': 'e86d6a94eea5e6e16e476410ee33a6e1',

				// 	},


				// 	formData: {

				// 		"lead_name": jsonObj[i].FirstName + '' + jsonObj[i].LastName,
				// 		"lead_email": jsonObj[i].Email,
				// 		"firm": jsonObj[i].Firm,
				// 		"Investment": jsonObj[i].Investment,
				// 		"Title": jsonObj[i].Title,
				// 		"Lead_phone": jsonObj[i].ContactNumber,
				// 	},


				// };

				// const response = await axios(config);
				// console.log(response, 'response')
				// //await sleep(4000);
			}
			catch (error) {
				console.log(error)
			}
		};

		return true;



	}


}


module.exports = leadService;