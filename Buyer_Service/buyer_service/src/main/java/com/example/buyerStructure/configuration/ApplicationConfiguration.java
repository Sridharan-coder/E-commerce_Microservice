package com.example.buyerStructure.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.buyerStructure.jwtValidation.JwtFilter;



@Configuration
@EnableWebSecurity
public class ApplicationConfiguration {

	private final MyUserDetailService userDetailsService;

	@Autowired
	private JwtFilter jwtFilter;

	public ApplicationConfiguration(MyUserDetailService userDetailsService) {

		this.userDetailsService = userDetailsService;
	}

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("http://localhost:3000"); // React front-end
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {

		try {

//			http.csrf(customizer -> customizer.disable());
//			http.authorizeHttpRequests(request -> request.anyRequest().authenticated());
////			http.formLogin(Customizer.withDefaults());
//			http.httpBasic(Customizer.withDefaults());
//			http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

//			return http.build();

			return http.csrf(customizer -> customizer.disable()).authorizeHttpRequests(request -> request
					.requestMatchers("/user/userLogin", "/user/createUser")
					.permitAll().anyRequest().authenticated())
//					.formLogin(Customizer.withDefaults())
//					.httpBasic(Customizer.withDefaults())
					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
					.cors(cors -> cors.configurationSource(corsConfigurationSource())).build();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Bean
	AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
		provider.setUserDetailsService(userDetailsService);
		return provider;
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();
	}

}
