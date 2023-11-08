package co.edu.unicauca.oci.backend.apirest.auth;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers(HttpMethod.GET, "/api/roles").permitAll()
				.antMatchers(HttpMethod.GET, "/api/encode/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/users").permitAll()
				.antMatchers(HttpMethod.GET, "/api/usersRol").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/users/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/users/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/logins").permitAll()
				.antMatchers(HttpMethod.POST, "/api/recoverPassword").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/changePassword/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/saveLogin").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/users/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/addLogin").permitAll()
				.antMatchers(HttpMethod.GET, "/api/positions").permitAll()
				.antMatchers(HttpMethod.POST, "/api/saveUser").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/planes").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/planes/**/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/resumenPlan").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/ver-plan/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/greeting").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/planes-proceso/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/count-estado-proceso/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/mpdm/editar-plan").permitAll()
				.antMatchers(HttpMethod.POST, "/api/mpdm/planes").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/mpdm/eliminar-plan").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/GeneradorId").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/procesos").permitAll()
				.antMatchers(HttpMethod.GET, "/api/mpdm/control-pm").permitAll()
				.antMatchers(HttpMethod.GET, "/api/tipoControl/tipo").permitAll()
				.antMatchers(HttpMethod.GET, "/api/hallazgo/hallazgos").permitAll()
				.antMatchers(HttpMethod.GET, "/api/hallazgo/hallazgos/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/hallazgo/hallazgos").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/hallazgo/hallazgos/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/hallazgo/hallazgos/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/hallazgo/getHallazgosPorIdPlan").permitAll()
				.antMatchers(HttpMethod.GET, "/api/hallazgo/hallazgos-proceso/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/hallazgo//hallazgos-activos").permitAll()
				.antMatchers(HttpMethod.POST, "/api/causa/causas").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/causa/causas/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/causa/causas").permitAll()
				.antMatchers(HttpMethod.GET, "/api/causa/causas/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/causa/causas/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/causa/getCausasPorIdHallazgo/**").permitAll() 
				.antMatchers(HttpMethod.POST, "/api/accion/acciones").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/accion/acciones/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/accion/acciones/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/accion/acciones").permitAll()
				.antMatchers(HttpMethod.GET, "/api/accion/acciones/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/accion/count-acciones-proceso/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/accion/count-acciones-plan").permitAll()
				.antMatchers(HttpMethod.GET, "/api/accion/count-acciones-activas").permitAll()
				.antMatchers(HttpMethod.GET, "/api/saveUser").permitAll()
				.antMatchers(HttpMethod.GET, "/api/accion/getAccionesPorIdCausa/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/actividades").permitAll()
				.antMatchers(HttpMethod.POST, "/api/actividad/actividades").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/actividad/actividades/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/actividad/actividades/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/getActividadesPorIdAccion/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/getActividadesPorIdPlan").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/actividades-plan").permitAll()
				.antMatchers(HttpMethod.GET, "api/actividad/count-estado").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/count-estado-proceso/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/count-estado-plan").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/get-actividades-activas").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/actividad/update-avance/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/update-estados").permitAll()
				.antMatchers(HttpMethod.GET, "/api/observacion/observaciones").permitAll()
				.antMatchers(HttpMethod.GET, "/api/observacion/observaciones/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/observacion/observaciones/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/observacion/getObservacionPorIdPlan").permitAll()
				.antMatchers(HttpMethod.POST, "/api/observacion/observaciones").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/observacion/observaciones/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/evaluacion/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/evaluacion/getEvaluacion/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/evaluacion/update").permitAll()
				.antMatchers(HttpMethod.GET, "/api/actividad/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/dependences").permitAll()
				.antMatchers(HttpMethod.GET, "/api/evidencia/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/evidencia/getTablaResponsable/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/evidencia/getEvidenciasPorIdActividad/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/evidencia/save").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/evidencia/update").permitAll()
				.antMatchers(HttpMethod.POST, "/api/evaluacion/save").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/soporte/update").permitAll()
				.anyRequest().authenticated();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:4200", "https://fiet.unicauca.edu.co/oficina-control-interno", "https://rectoria.unicauca.edu.co/oficina-control-interno"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowCredentials(true);
		config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "code-url"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter() {
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(
				new CorsFilter(corsConfigurationSource()));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}

}
