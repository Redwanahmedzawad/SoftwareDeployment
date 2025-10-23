const model = defineModel('modelValue');
const props = withDefaults(defineProps(), { type: 'text' });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_modelEmit = defineEmits();
const __VLS_defaults = { type: 'text' };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "input" },
    type: (props.type),
    placeholder: (props.placeholder),
});
(__VLS_ctx.model);
// @ts-ignore
[model,];
/** @type {__VLS_StyleScopedClasses['input']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
