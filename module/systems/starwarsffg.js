import { descriptions, t } from "../utils.js";

const fraction = function (token) {
	let hp = token.actor.system.stats.wounds;
	if (token.actor.type === "vehicle") {
		hp = token.actor.system.stats.hullTrauma;
	}
	return Math.min((hp.max - hp.value) / hp.max, 1);
};
const settings = () => {
	return {
		"starfinder.vehicleNames": {
			type: String,
			default: t("dnd5e.vehicleNames.default"),
			hint: t("dnd5e.vehicleNames.hint"),
		},
	};
};

export { fraction, settings, descriptions };
