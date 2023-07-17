import { JSDOM } from 'jsdom';
import 'jsdom-global/register';

import axios from 'axios';

// Set the global fetch function to axios
global.fetch = axios;



  

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;


