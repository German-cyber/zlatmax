import { plagins } from "../modules/plugins.js";
import {inlinePositioning, sticky} from 'tippy.js';
plagins.tooltips('[data-tippy-content]', {
  content: 'Tooltip',
    maxWidth: 400,
    inlinePositioning: true,
    sticky: true,
    plugins: [inlinePositioning, sticky],
});