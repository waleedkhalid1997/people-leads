const LeadService = require("../services/leadServices");
const LeadServiceInstance = new LeadService();

const createNewLead = async (req, res, next) => {

	
	try {
		result = await LeadServiceInstance.createLeads();
		if (!result) {
			console.log(result,'here')
			res.status(404).json({ message: "User not Created" });
			return;
		}
		res.status(200).json({ status: true, response: { message: "Success" } });
		
	}
	catch (error) {
		res.status(400).json({ status: false, response: { message: error.message } });
	}
};

module.exports = {
	createNewLead,

};