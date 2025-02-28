import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import specific icons (add icons as needed)
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

// Add icons to the library
library.add(faBars, faTimes, faSearch, faFacebook, faTwitter);

// Export the component globally
export default FontAwesomeIcon;


