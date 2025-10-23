const props = withDefaults(defineProps(), { tone: 'default' });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = { tone: 'default' };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: (['badge', props.tone === 'success' && 'badge-success', props.tone === 'warn' && 'badge-warn', props.tone === 'danger' && 'badge-danger']) },
});
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
