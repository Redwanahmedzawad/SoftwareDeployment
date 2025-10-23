import { computed } from 'vue';
const props = defineProps();
const pct = computed(() => (props.total ? Math.round((props.done / props.total) * 100) : 0));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-flex u-gap-3" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-text-muted" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
(__VLS_ctx.pct);
// @ts-ignore
[pct,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
(props.done);
(props.total);
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "progress" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ style: ({ '--value': __VLS_ctx.pct + '%' }) },
});
// @ts-ignore
[pct,];
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['u-text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['progress']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
