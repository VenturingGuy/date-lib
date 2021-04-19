const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dy = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class D {
    constructor(...args) {
        this._date = new Date(...args)
    }

    /**
    * Year getter method.
    * 
    * @param {number} input year
    * @returns {number} year in string format
    */
    get year(){
        return this._date.getFullYear()
    }

    /**
     * Shortened year getter method.
     * 
     * @param {number} input year
     * @returns {number} year in a 2 digit format (ie. 2021 becomes 21)
     */
    get yr(){
        return parseInt(this.year.toString().slice(2))
    }

    /**
    * Month getter method.
    * 
    * @param {number} input month
    * @returns {number} month in string format
    */
    get month(){
        return month[this._date.getMonth()]
    }

    /**
     * Shortened month getter method.
     * 
     * @param {number} input month
     * @returns {number} month in an abbreviated form (ie. April becomes Apr)
     */
    get mon(){
        return mon[this._date.getMonth()]
    }

    /**
    * Day getter method.
    * 
    * @param {number} input day
    * @returns {number} day in string format
    */
    get day(){
        return day[this._date.getDay()]
    }

    /**
     * Shortened day getter method.
     * 
     * @param {number} input day
     * @returns {number} day in an abbreviated form (ie. Sunday becomes Sun)
     */
    get dy(){
        return dy[this._date.getDay()]
    }

    /**
    * Date getter method.
    * 
    * @param {number} input date
    * @returns {number} date in number format
    */
    get date(){
        return this._date.getDate()
    }
    
    /**
    * Hour getter method.
    * 
    * @param {number} input hours
    * @returns {number} given hour
    */
    get hours(){
        return this._date.getHours()
    }

    /**
    * Minute getter method.
    * 
    * @param {number} input minute
    * @returns {number} given minute
    */
    get mins(){
        return this._date.getMinutes()
    }

    /**
    * Seconds getter method.
    * 
    * @param {number} input seconds
    * @returns {number} given seconds
    */
    get secs(){
        return this._date.getSeconds()
    }

    /**
     * Date formatting method.
     * @param {number} input a given date
     * @returns {string} a date formatted with respect to the input
     */

    format(mask = "Y M D"){
        let zeroDate = value => value <= 9 ? '0' + value : value
        const masks = mask.split('')
        let formatOutput = ''
        let sep = masks[1] + " "
        
        // Issue: Getting the formatting to work with spacing in mind. What could I do to ensure that the output is formatted to always
        // be separated by the desired character?
        
        masks.forEach((char) => {
          // What does this really *do*? Why is it here, and what could I do to integrate the desired effect into
          // the function in a more cohesive manner? Tying it to masks[1] isn't future proof nor a catch all.
          // Potential solution: scrap the sep variable and simplify it to a join of some kind?
          sep = masks[1]
          if (masks[1] != " "){
            sep = masks[1] + " "
          }

          switch (char) {
            case 'Y':
              formatOutput += (this.year + sep)
              break
            case 'y':
              formatOutput += (this.yr + sep)
              break
            case 'M':
              formatOutput += (this.month + sep)
              break
            case 'm':
              formatOutput += (this.mon + sep)
              break
            case 'D':
              formatOutput += (zeroDate(this._date.getDate()) + sep)
              break
            case 'd':
              formatOutput += (this.date + sep)
              break
            case 'H':
              formatOutput += (zeroDate(this._date.getHours()) + sep)
              break
            case 'h':
              formatOutput += (this.hours + sep)
              break
            case 'I':
              formatOutput += (zeroDate(this._date.getMinutes()) + sep)
              break;
            case 'i':
              formatOutput += (this.mins + sep)
              break
            case 'S':
              formatOutput += (zeroDate(this._date.getSeconds()) + sep)
              break
            case 's':
              formatOutput += (this.secs + sep)
              break
          }
        });
        return formatOutput.trim()
    }
    /**
     * Method determines difference between current date/time and a given date/time.
     * 
     * @param {number} input a given date
     * @returns {string} difference in years, months, or days of the given date from current time
     */
    when() {
      // Issue: Accounting for exact differences in dates. IE, 364 (assuming not a leap year) days from now, will register as 1
      // year, 1 day from now rather than x months, y days from now
      const now = new D()
      var dateTense = Math.round((this._date - now._date) / 1000);


      const yearDiff = this.year - now.year;
      const monthDiff = this._date.getMonth() - now._date.getMonth() + yearDiff * 12;
      const dayDiff = this.date - now.date;

      let timeDiff = "Today."

      if (dateTense > 0) {
        timeDiff = "from now."
      }
      else if (dateTense){
        timeDiff = "ago."
      }
      var whenOutput = []

      if (yearDiff > 0) {
          whenOutput.push(`${yearDiff} year(s)`);
      }
      else if (yearDiff < 0 && monthDiff > 12) {
          whenOutput.push(`${Math.abs(this.year)} year(s)`);
      } 
      
      if (monthDiff > 0 && monthDiff < 12) {
        whenOutput.push(`${monthDiff} month(s)`);
      }
      else if (monthDiff < 0 && monthDiff > -11) {
          whenOutput.push(`${Math.abs(monthDiff)} month(s)`);
      }

      if (dayDiff > 0) {
        whenOutput.push(`${dayDiff} day(s)`);
      }
      else if (dayDiff < 0) {
        whenOutput.push(`${Math.abs(dayDiff)} day(s)`);
      }
      
      return `${whenOutput.join(', ')} ${timeDiff}`.trim()
    }
}

module.exports = {
  D: D
}
