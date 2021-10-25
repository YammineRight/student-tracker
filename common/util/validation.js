const deCamelize = (string) => {
  return string
    .replace(/([a-z\d])([A-Z])/g, "$1" + " " + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + " " + "$2")
    .toLowerCase();
};

export class Validator {
  static ruleTypes = {
    // a mutating rule must return the mutated value in the success atribute instead of true
    mutating: "mutating",
    haltingOnFail: "haltingOnFail",
    haltingOnSuccess: "haltingOnSuccess",
  };

  static rules = {
    // validator function should always return an array [boolean] or [boolean, string]
    // it should return {success: boolean, errorType: string} if the errorMsg contains different errors for the same validator
    // for example the min validator returns {success: boolean, errorType: "number"} to indicate that the errorMsg["number"] should be retruned
    // the importance is optional; its used to sort the rule input
    email: {
      validator: (value) => this.email(value),
      errorMsg: (field) =>
        `The ${deCamelize(field)} must be a valid email address.`,
    },

    required: {
      validator: (value) => this.required(value),
      errorMsg: (field) => `The ${deCamelize(field)} field is required.`,
      importance: 2,
      type: this.ruleTypes.haltingOnFail,
    },

    min: {
      validator: (value, minValue) => this.min(value, minValue),
      errorMsg: {
        string: (field, minValue) =>
          `The ${deCamelize(field)} must be at least ${minValue} characters`,
        number: (field, minValue) =>
          `The ${deCamelize(field)} must be at least ${minValue}`,
      },
    },

    max: {
      validator: (value, maxValue) => this.max(value, maxValue),
      errorMsg: {
        string: (field, maxValue) =>
          `The ${deCamelize(field)} may not be greater ${maxValue} characters`,
        number: (field, maxValue) =>
          `The ${deCamelize(field)} may not be greater ${maxValue}`,
      },
    },

    contains: {
      validator: (value, element) => this.contains(value, element),
      errorMsg: (field, element) => this.containsErrorMsg(field, element),
    },

    date: {
      validator: (value, condition) => this.date(value, condition),
      errorMsg: (field, condition) => this.dateError(field, condition),
    },

    url: {
      validator: (value) => this.url(value),
      errorMsg: (field) => `The ${deCamelize(field)} must be a valid url`,
    },

    number: {
      validator: (value) => ({
        success: isNaN(value) ? false : parseFloat(value),
      }),
      errorMsg: (field) => `The ${deCamelize(field)} must be a number`,
      importance: 1,
      type: this.ruleTypes.mutating,
    },

    nullable: {
      validator: (value) => ({ success: !this.required(value).success }),
      importance: 3,
      type: this.ruleTypes.haltingOnSuccess,
    },

    equals: {
      validator: (value, otherValue) => ({ success: value === otherValue }),
      errorMsg: (field, otherValue) =>
        `The ${deCamelize(field)} must equal to ${otherValue}`,
    },
  };

  static regExs = {
    contains: {
      special: /^(?=.*[^A-Za-z0-9])(?=.{1,})/,
      capital: /^(?=.*[A-Z])(?=.{1,})/,
      number: /^(?=.*[0-9])(?=.{1,})/,
    },
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/,
  };

  /**
   * @param {object} Object - the object you would like to check if it is empty.
   */
  static isEmpty = (obj) => {
    const success =
      obj && Object.keys(obj).length === 0 && obj.constructor === Object;

    return { success };
  };

  /**
   * @param {string} value - the value you would like to check if it is a valid email.
   */
  static email = (value) => {
    const success = this.regExs.email.test(String(value).toLowerCase());

    return { success };
  };

  /**
   * @param {*} value - the value you would like to check if it is not empty null or undefined.
   */
  static required = (value) => {
    let success = true;

    if (typeof value === "undefined" || !value) {
      success = false;
    }

    const trimedValue = String(value).trim();

    if (trimedValue === "") {
      success = false;
    }

    return { success };
  };

  /**
   * @param {(string|number)} value - value you would like to check if its greater than a certain number.
   * @param {number} minValue - the value that you are comparing it to.
   */
  static min = (value, minValue) => {
    if (!["string", "number"].includes(typeof value)) {
      throw new Error("The min function only compares strings or numbers");
    } else {
      const comparableValue = typeof value === "string" ? value.length : value;
      const success = comparableValue >= minValue;
      const errorType = typeof value;

      return { success, errorType };
    }
  };

  /**
   * @param {(string|number)} value - value you would like to check if its less than a certain number.
   * @param {number} maxValue - the value that you are comparing it to.
   */
  static max = (value, maxValue) => {
    if (!["string", "number"].includes(typeof value)) {
      throw new Error("The max rule only compares strings or numbers");
    } else {
      const comparableValue = typeof value === "string" ? value.length : value;
      const success = comparableValue <= maxValue;
      const errorType = typeof value;

      return { success, errorType };
    }
  };

  /**
   * @param {(string|number)} value - value you would like to check if it contains an element.
   * @param {string} element - the available option are "capital", "special", "number".
   */
  static contains = (value, element) => {
    if (!["string", "number"].includes(typeof element)) {
      throw new Error("contains rule only compares strings or numbers");
    }
    const regEx = this.regExs["contains"][element];
    if (!regEx) throw new Error(`${element} is not supported for contains`);
    const success = regEx.test(String(value));

    return { success };
  };

  /**
   * @param {string} field - field name to generate customized error.
   * @param {string} element - the available option are "capital", "special", "number".
   */
  static containsErrorMsg = (field, element = "number") => {
    let errorMsg = `The ${deCamelize(
      field
    )} must contain at least one ${element}`;

    switch (element) {
      case "special":
        errorMsg += " character";
        break;
      case "capital":
        errorMsg += " letter";
        break;
    }

    return errorMsg;
  };

  /**
   * @param {string} date - the date you would like to validate.
   * @param {string} condition - the available option are "future".
   */
  static date = (date, condition = null) => {
    if (typeof date === "string" && this.regExs.date.test(date)) {
      date = new Date(date);
    }

    if (
      Object.prototype.toString.call(date) !== "[object Date]" ||
      isNaN(date.getTime())
    ) {
      return { success: false };
    }

    if (condition === "future") {
      const now = new Date();
      return { success: date > now };
    }

    return { success: true };
  };

  /**
   * @param {string} field - field name to generate customized error.
   * @param {string} condition - the available option are "future".
   */
  static dateError = (field, condition = null) => {
    if (condition && condition === "future") {
      return `The ${deCamelize(field)} must be a date set in the future`;
    }

    return `The ${deCamelize(field)} must be a valid date`;
  };

  /**
   * @param {string} value - the value you would like to check if it is a valid url.
   */
  static url = (value) => {
    const success = this.regExs.url.test(String(value));

    return { success };
  };

  /**
   * @param {string[]|string} rules - array of rules ie: ["required", "min:9", "max:12", "email"].or "required|min:8|max:13|email"
   */
  static sortAndCleanRules = (rules) => {
    if (Array.isArray(rules) !== true && typeof rules !== "string") {
      throw new Error("rules can only be a string or array");
    }

    if (typeof rules === "string") {
      rules = rules.split("|");
    }

    //removing white spaces and checking if rules are valid
    // also spliting rule and conditioin ie "max:13" => ["max", "13"]
    const sortedRules = rules.map((rule) => {
      rule = rule.replace(/\s/g, "");

      const [ruleName] = (rule = rule.split(":"));

      if (this.rules[ruleName] && rule.length <= 2) {
        return rule;
      } else {
        throw new Error(`this rule (${rule}) does not exist`);
      }
    });

    const ruleImportance = (name) => this.rules[name].importance || 0;

    sortedRules.sort(([ruleName1], [ruleName2]) => {
      return ruleImportance(ruleName2) - ruleImportance(ruleName1);
    });

    return sortedRules;
  };

  /**
   * @param {string} fieldName - name of the field you want to validate.
   * @param {(string|number)} value - value of the field you want to validate.
   * @param {string[]|string} rules - array of rules ie: ["required", "min:9", "max:12", "email"].or "required|min:8|max:13|email"
   */
  static validateField = (fieldName, value, rules) => {
    const modifiedRules = this.sortAndCleanRules(rules);
    const fieldErrors = [];

    validationProccess: for (const i in modifiedRules) {
      const [ruleName, condition] = modifiedRules[i];
      const { validator, errorMsg, type } = this.rules[ruleName];
      const { success, errorType } = validator(value, condition);

      if (success === false) {
        if (errorMsg) {
          const error = errorType
            ? errorMsg[errorType](fieldName, condition)
            : errorMsg(fieldName, condition);

          fieldErrors.push(error);
        }

        if (type === "haltingOnFail") {
          break validationProccess;
        }
      } else {
        // mutating rules returns new value instead of true in the success atribute
        if (type === "mutating") {
          value = success;
        }
        // stop validation if the rule halts the validation process on success (nullable)
        if (type === "haltingOnSuccess") {
          break validationProccess;
        }
      }
    }

    return {
      success: fieldErrors.length === 0,
      errors: fieldErrors,
    };
  };

  /**
   * @param {Object} form - (key:value) are the name and the value of the fields respectively.
   * @param {Object} rule - (key:value) are the name and the rules of the fields respectively.
   */
  static validate(form = {}, rules = {}) {
    const allErrors = {};
    let allSuccess = true;

    for (const field in rules) {
      const { success, errors } = this.validateField(
        field,
        form[field],
        rules[field]
      );

      if (!success) {
        allErrors[field] = errors;
        allSuccess = false;
      }
    }

    return {
      success: allSuccess,
      errors: allErrors,
    };
  }
}
