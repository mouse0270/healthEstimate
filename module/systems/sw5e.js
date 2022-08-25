import { descriptions, t } from "../utils.js";

const fraction = function (token) {
	const hp = token.actor.system.attributes.hp;
	let temp = 0;
	if (token.actor.type === "vehicle" && game.settings.get("healthEstimate", "starfinder.useThreshold")) {
		if (hp.value > hp.dt) {
			return 1;
		} else if (hp.value > 0) {
			return 0.5;
		}
		return 0;
	}
	if (token.actor.type === "character" && game.settings.get("healthEstimate", "core.addTemp")) {
		temp = hp.temp;
	}
	return Math.min((temp + hp.value) / hp.max, 1);
};
const settings = () => {
	return {
		"core.addTemp": {
			type: Boolean,
			default: false,
		},
		"core.breakOnZeroMaxHP": {
			type: Boolean,
			default: true,
		},
		"starfinder.useThreshold": {
			type: Boolean,
			default: false,
		},
		"starfinder.thresholdNames": {
			config: false,
			type: String,
			default: t("starfinder.thresholdNames.default"),
		},
		"starfinder.vehicleNames": {
			type: String,
			default: t("dnd5e.vehicleNames.default"),
			hint: t("dnd5e.vehicleNames.hint"),
		},
	};
};

const breakCondition = `||game.settings.get('healthEstimate', 'core.breakOnZeroMaxHP') && token.actor.system.attributes.hp.max === 0`;

export { fraction, settings, breakCondition, descriptions };
