import ThemeToggle from './ThemeToggle.vue';
import Button from './ui/Button.vue';
const emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-flex u-gap-3" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-flex u-gap-3" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('add');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_6 } = __VLS_2.slots;
var __VLS_2;
/** @type {[typeof ThemeToggle, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(ThemeToggle, new ThemeToggle({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-3']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
