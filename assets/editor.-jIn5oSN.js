(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`db054c4e7fa68126bbc24e00d21fac3e15104df3`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`6146b4d1-93d0-4b89-bccd-0eaa830b448f`,e._sentryDebugIdIdentifier=`sentry-dbid-6146b4d1-93d0-4b89-bccd-0eaa830b448f`)}catch{}})();import{o as e}from"./rolldown-runtime.CGoupnzX.js";import{Qt as t,Rt as n,fn as r,gn as i,qt as a}from"./api-config.C8sq8vkA.js";import{Qd as o,_r as s,hf as c}from"./app-core.CFZvb2Xb.js";import{t as l}from"./js.DftLoOBf.js";import{t as u}from"./CodeEditor.D6I365KN.js";var d=e(l());t();var f=a({components:{CodeEditor:u},props:{formatCode:{type:Boolean,required:!0}},emits:[`formatComplete`],data(){return{exampleXslt:``,wrapEnabled:!0}},mounted(){this.initializeEditor()},computed:{xsltData:{get(){return this.current_model.xslt_data||``},set(e){this.current_model.xslt_data=e}},editorLanguage(){return this.isJsonContent()?`json`:`xml`}},watch:{formatCode(e){e&&this.initFormatting()}},methods:{initializeEditor(){this.exampleXslt=this.buildExampleXslt()},isJsonContent(){let e=(this.current_model.xslt_data||``).trim();return e.startsWith(`{`)&&e.endsWith(`}`)||e.startsWith(`[`)&&e.endsWith(`]`)},initFormatting(){this.wrapEnabled=!1,this.isJsonContent()?this.formatJsonCode():this.formatXmlCode()},formatJsonCode(){try{this.current_model.xslt_data=d.default.js(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting JSON code:`,e)}},formatXmlCode(){try{this.current_model.xslt_data=d.default.html(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting XML code:`,e)}},buildExampleXslt(){return`<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="xml" />
    <xsl:strip-space elements="*" />

    <xsl:template match="/document">
    <dokument>
        <filename><xsl:value-of select="filename" /></filename>
        <basic_info>
            <invoice_number><xsl:value-of select="fields_compact/invoice_id" /></invoice_number>
            <date><xsl:value-of select="fields_compact/invoice_date" /></date>
        </basic_info>
        <amounts>
            <net_amount><xsl:value-of select="fields_compact/net_amount" /></net_amount>
            <total_amount><xsl:value-of select="fields_compact/total_amount" /></total_amount>
        </amounts>
    </dokument>


    </xsl:template>

</xsl:stylesheet>`}},setup(){let e=s(),{current_model:t,isReadOnly:n}=o(e);return{current_model:t,isReadOnly:n,formatOptions:{indent_size:4,indent_char:` `,eol:`
`,end_with_newline:!1,preserve_newlines:!0,max_preserve_newlines:2,indent_inner_html:!0,wrap_line_length:0,unformatted:[],extra_liners:[]}}}});function p(e,t,a,o,s,c){let l=i(`CodeEditor`);return r(),n(l,{modelValue:e.xsltData,"onUpdate:modelValue":t[0]||=t=>e.xsltData=t,language:e.editorLanguage,"read-only":e.isReadOnly,placeholder:e.exampleXslt,wrap:e.wrapEnabled,ref:`codeEditor`},null,8,[`modelValue`,`language`,`read-only`,`placeholder`,`wrap`])}var m=c(f,[[`render`,p]]);export{m as t};