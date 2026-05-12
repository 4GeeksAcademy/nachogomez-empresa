document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("application-form");

	if (!form) {
		return;
	}

	const fieldRules = {
		nombre: {
			required: true,
			message: "Ingresa tu nombre completo.",
			minLength: 3,
			minMessage: "El nombre debe tener al menos 3 caracteres."
		},
		email: {
			required: true,
			message: "Ingresa tu email.",
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
			patternMessage: "Ingresa un email válido."
		},
		telefono: {
			required: true,
			message: "Ingresa tu teléfono.",
			pattern: /^\+?[0-9\s()-]{7,20}$/,
			patternMessage: "Ingresa un teléfono válido."
		},
		nacionalidad: {
			required: true,
			message: "Ingresa tu nacionalidad."
		},
		ciudad: {
			required: true,
			message: "Ingresa tu ciudad de residencia."
		},
		area: {
			required: true,
			message: "Selecciona un área de interés."
		},
		experiencia: {
			required: true,
			message: "Cuéntanos tu experiencia previa.",
			minLength: 20,
			minMessage: "Describe tu experiencia con al menos 20 caracteres."
		},
		historial: {
			required: true,
			message: "Ingresa tu historial laboral.",
			minLength: 20,
			minMessage: "Describe tu historial con al menos 20 caracteres."
		}
	};

	function getFieldValue(field) {
		return field.value.trim();
	}

	function setError(fieldId, message) {
		const field = document.getElementById(fieldId);
		const errorNode = document.getElementById("error-" + fieldId);

		if (field) {
			field.setAttribute("aria-invalid", "true");
			field.classList.add("border-red-500", "focus:border-red-500", "focus:ring-red-300");
			field.classList.remove("border-zinc-300", "dark:border-slate-700");
		}

		if (errorNode) {
			errorNode.textContent = message;
		}
	}

	function clearError(fieldId) {
		const field = document.getElementById(fieldId);
		const errorNode = document.getElementById("error-" + fieldId);

		if (field) {
			field.setAttribute("aria-invalid", "false");
			field.classList.remove("border-red-500", "focus:border-red-500", "focus:ring-red-300");
			field.classList.add("border-zinc-300", "dark:border-slate-700");
		}

		if (errorNode) {
			errorNode.textContent = "";
		}
	}

	function validateField(fieldId) {
		const field = document.getElementById(fieldId);
		const rules = fieldRules[fieldId];

		if (!field || !rules) {
			return true;
		}

		const value = getFieldValue(field);

		if (rules.required && value.length === 0) {
			setError(fieldId, rules.message);
			return false;
		}

		if (rules.minLength && value.length < rules.minLength) {
			setError(fieldId, rules.minMessage);
			return false;
		}

		if (rules.pattern && !rules.pattern.test(value)) {
			setError(fieldId, rules.patternMessage);
			return false;
		}

		clearError(fieldId);
		return true;
	}

	const fieldIds = Object.keys(fieldRules);

	fieldIds.forEach(function (fieldId) {
		const field = document.getElementById(fieldId);

		if (!field) {
			return;
		}

		field.addEventListener("blur", function () {
			validateField(fieldId);
		});

		field.addEventListener("input", function () {
			if (field.getAttribute("aria-invalid") === "true") {
				validateField(fieldId);
			}
		});

		if (field.tagName === "SELECT") {
			field.addEventListener("change", function () {
				validateField(fieldId);
			});
		}
	});

	form.addEventListener("submit", function (event) {
		let isFormValid = true;
		let firstInvalidField = null;

		fieldIds.forEach(function (fieldId) {
			const isFieldValid = validateField(fieldId);

			if (!isFieldValid) {
				isFormValid = false;
				if (!firstInvalidField) {
					firstInvalidField = document.getElementById(fieldId);
				}
			}
		});

		if (!isFormValid) {
			event.preventDefault();
			if (firstInvalidField) {
				firstInvalidField.focus();
			}
			return;
		}

		event.preventDefault();
		form.reset();
		fieldIds.forEach(clearError);
		alert("Aplicación enviada con éxito. Gracias por postularte a Brasaland Digital.");
	});
});
