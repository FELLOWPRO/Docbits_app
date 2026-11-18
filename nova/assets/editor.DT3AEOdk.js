(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`3bcc1d2d324a5f4b8d3ad62178157a5d787c95bb`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`aa7ad64e-cd0c-4304-b388-e5406c15beaf`,e._sentryDebugIdIdentifier=`sentry-dbid-aa7ad64e-cd0c-4304-b388-e5406c15beaf`)}catch{}})();import{o as e}from"./rolldown-runtime.DVYMkKpC.js";import{t}from"./js.-Yxn4d_P.js";import{Kf as n,jf as r,yr as i}from"./app-core.Dei4S6gL.js";import{Bt as a,Yt as o,en as s,mn as c,vn as l}from"./api-config.CM4-IpnN.js";import{t as u}from"./CodeEditor.C7hmPVIa.js";var d=e(t());s();var f=o({components:{CodeEditor:u},props:{formatCode:{type:Boolean,required:!0}},emits:[`formatComplete`],data(){return{exampleXslt:``,wrapEnabled:!0}},mounted(){this.initializeEditor()},computed:{xsltData:{get(){return this.current_model.xslt_data||``},set(e){this.current_model.xslt_data=e}},editorLanguage(){return this.isJsonContent()?`json`:`xml`}},watch:{formatCode(e){e&&this.initFormatting()}},methods:{initializeEditor(){this.exampleXslt=this.buildExampleXslt()},isJsonContent(){let e=(this.current_model.xslt_data||``).trim();return e.startsWith(`{`)&&e.endsWith(`}`)||e.startsWith(`[`)&&e.endsWith(`]`)},initFormatting(){this.wrapEnabled=!1,this.isJsonContent()?this.formatJsonCode():this.formatXmlCode()},formatJsonCode(){try{this.current_model.xslt_data=d.default.js(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting JSON code:`,e)}},formatXmlCode(){try{this.current_model.xslt_data=d.default.html(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting XML code:`,e)}},buildExampleXslt(){return`<?xml version="1.0" encoding="UTF-8"?>

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

</xsl:stylesheet>`}},setup(){let e=i(),{current_model:t,isReadOnly:n}=r(e);return{current_model:t,isReadOnly:n,formatOptions:{indent_size:4,indent_char:` `,eol:`
`,end_with_newline:!1,preserve_newlines:!0,max_preserve_newlines:2,indent_inner_html:!0,wrap_line_length:0,unformatted:[],extra_liners:[]}}}});function p(e,t,n,r,i,o){let s=l(`CodeEditor`);return c(),a(s,{modelValue:e.xsltData,"onUpdate:modelValue":t[0]||=t=>e.xsltData=t,language:e.editorLanguage,"read-only":e.isReadOnly,placeholder:e.exampleXslt,wrap:e.wrapEnabled,ref:`codeEditor`},null,8,[`modelValue`,`language`,`read-only`,`placeholder`,`wrap`])}var m=n(f,[[`render`,p]]);export{m as t};