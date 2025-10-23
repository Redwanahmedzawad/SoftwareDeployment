import { cn } from '../../lib/cn';
const props = withDefaults(defineProps(), { variant: 'primary', type: 'button' });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = { variant: 'primary', type: 'button' };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: (props.type),
    disabled: (props.disabled),
    ...{ class: (__VLS_ctx.cn('btn', props.variant === 'primary' && 'btn-primary', props.variant === 'outline' && 'btn-outline', props.variant === 'ghost' && 'btn-ghost')) },
});
// @ts-ignore
[cn,];
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
